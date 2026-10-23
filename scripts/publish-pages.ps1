param([string]$Repository = 'nexonet-v2-beta')
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
if ($Repository -notmatch '^[a-zA-Z0-9_.-]+$') { throw 'Nombre de repositorio inválido.' }
$env:GCM_INTERACTIVE = 'Never'
$env:GIT_TERMINAL_PROMPT = '0'
$credentialLines = "protocol=https`nhost=github.com`n`n" | git credential fill 2>$null
if ($LASTEXITCODE -ne 0) { throw 'Inicia sesión primero: git credential-manager github login --device --no-ui' }
$fields = @{}
foreach ($line in $credentialLines) { if ($line -match '^([^=]+)=(.*)$') { $fields[$matches[1]] = $matches[2] } }
if (!$fields.password) { throw 'No hay credenciales de GitHub disponibles.' }
$headers = @{ Authorization = "Bearer $($fields.password)"; Accept = 'application/vnd.github+json'; 'User-Agent' = 'NexoNet-Beta-Pages' }
$profile = Invoke-RestMethod 'https://api.github.com/user' -Headers $headers
$owner = $profile.login
$api = "https://api.github.com/repos/$owner/$Repository"
$staging = Join-Path (Get-Location) ".publish/$Repository"
$repo = $null
try { $repo = Invoke-RestMethod $api -Headers $headers } catch { if ([int]$_.Exception.Response.StatusCode -ne 404) { throw } }
if ($repo -and (!(Test-Path (Join-Path $staging '.git')) -or $repo.private)) {
    throw 'Ya existe un repositorio con ese nombre. Usa -Repository con otro nombre para evitar modificarlo.'
}
& npm.cmd run build:pages
if ($LASTEXITCODE -ne 0) { throw 'Falló la compilación.' }
& node tests/pages-check.mjs
if ($LASTEXITCODE -ne 0) { throw 'Falló la comprobación de Pages.' }
if (!$repo) {
    $body = @{name=$Repository; description='NexoNet V5: beta pública para revisión y feedback'; private=$false; auto_init=$false} | ConvertTo-Json
    $repo = Invoke-RestMethod 'https://api.github.com/user/repos' -Headers $headers -Method Post -ContentType 'application/json' -Body $body
}
New-Item -ItemType Directory -Force $staging | Out-Null
if (!(Test-Path (Join-Path $staging '.git'))) {
    git -C $staging init -b beta-pages
    git -C $staging remote add origin $repo.clone_url
}
git -C $staging config user.name $owner
git -C $staging config user.email "$($profile.id)+$owner@users.noreply.github.com"
Copy-Item -Path 'dist/*' -Destination $staging -Recurse -Force
Copy-Item -LiteralPath 'dist/.nojekyll' -Destination $staging -Force
git -C $staging add --all
git -C $staging diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
    git -C $staging commit -m 'Publish latest NexoNet V5 beta for feedback'
    if ($LASTEXITCODE -ne 0) { throw 'Falló el commit.' }
}
git -C $staging push -u origin beta-pages
if ($LASTEXITCODE -ne 0) { throw 'Falló la subida a GitHub.' }
$pages = $null
try { $pages = Invoke-RestMethod "$api/pages" -Headers $headers } catch { if ([int]$_.Exception.Response.StatusCode -ne 404) { throw } }
if (!$pages) {
    $body = @{build_type='legacy'; source=@{branch='beta-pages'; path='/'}} | ConvertTo-Json
    $pages = Invoke-RestMethod "$api/pages" -Headers $headers -Method Post -ContentType 'application/json' -Body $body
}
Write-Output "Repositorio: $($repo.html_url)"
Write-Output "Publicación solicitada: $($pages.html_url)"
Write-Output 'Comprueba que la URL responda antes de compartirla; GitHub puede tardar varios minutos.'

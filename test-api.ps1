# Script de prueba para la API de textos

Write-Host "Probando POST /api/textos..." -ForegroundColor Green
$body = @{
    titulo = "Mi primer texto"
    contenido = "Este es el contenido de mi primer texto."
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/textos" -Method POST -ContentType "application/json" -Body $body
    Write-Host "✅ Texto creado exitosamente:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host $_.Exception.Response
}

Write-Host "`nProbando GET /api/textos..." -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/textos" -Method GET
    Write-Host "✅ Textos obtenidos:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}


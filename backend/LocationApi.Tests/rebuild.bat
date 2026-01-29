@echo off
echo TESTE DE INTEGRAÇÃO
echo.

echo LIMPEZA
cd ..
if exist bin rmdir /s /q bin
if exist obj rmdir /s /q obj
cd LocationApi.Tests
if exist bin rmdir /s /q bin
if exist obj rmdir /s /q obj

echo.
echo RESTAURAÇÃO
cd ..
dotnet restore --force

echo.
echo COMPILANDO PROJETO PRINCIPAL
dotnet build --no-restore

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERRO no projeto principal!
    pause
    exit /b 1
)

echo.
echo REALIZANDO TESTES
cd LocationApi.Tests
dotnet restore --force
dotnet test

echo.
if %ERRORLEVEL% EQU 0 (
    echo.
    echo TODOS OS TESTES PASSARAM
    echo.
) else (
    echo.
    echo Alguns testes falharam, mas compilou!
    echo.
)

pause
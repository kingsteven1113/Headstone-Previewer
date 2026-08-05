param(
  [Parameter(Mandatory = $true)]
  [string]$Command,

  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

$stripeExe = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\Stripe.StripeCli_Microsoft.Winget.Source_8wekyb3d8bbwe\stripe.exe"

if (-not (Test-Path $stripeExe)) {
  Write-Error "Stripe CLI executable was not found at: $stripeExe"
  exit 1
}

& $stripeExe $Command @Args
exit $LASTEXITCODE

"use client"

import { useState, useEffect } from "react"
import { ArrowRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Currency data (fake exchange rates)
const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 150.23 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.52 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.36 },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", rate: 0.9 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", rate: 7.24 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 83.12 },
  { code: "MXN", name: "Mexican Peso", symbol: "$", rate: 16.78 },
]

export default function CurrencyPage() {
  const [amount, setAmount] = useState("100")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState("")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Convert currency
  const convertCurrency = () => {
    const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1
    const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1
    const convertedAmount = (Number.parseFloat(amount) / fromRate) * toRate

    const toSymbol = currencies.find((c) => c.code === toCurrency)?.symbol || ""
    setResult(`${toSymbol}${convertedAmount.toFixed(2)}`)
    setLastUpdated(new Date())
  }

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // Convert on input change
  useEffect(() => {
    if (amount && !isNaN(Number.parseFloat(amount))) {
      convertCurrency()
    } else {
      setResult("")
    }
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-green-5">Currency Converter</h2>
        <p className="text-muted-foreground">Convert between different currencies for your trip</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Convert Currency</CardTitle>
          <CardDescription>Enter an amount and select currencies to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-2">
              <div className="font-medium">From</div>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center">
              <Button variant="ghost" size="icon" onClick={swapCurrencies}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="font-medium">To</div>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Amount</div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="rounded-lg bg-green-3 p-4">
            <div className="text-sm font-medium">Converted Amount</div>
            <div className="mt-1 text-3xl font-bold">{result || "-"}</div>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currencies.slice(0, 6).map((currency) => (
              <div key={currency.code} className="rounded-lg border p-3">
                <div className="font-medium">
                  {currency.code} - {currency.name}
                </div>
                <div className="mt-1 text-sm">
                  1 USD = {currency.symbol}
                  {currency.rate.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

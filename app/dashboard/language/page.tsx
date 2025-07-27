"use client"

import { useState } from "react"
import { Languages, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Language data
const languages = [
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "it", name: "Italian" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
]

// Travel types
const travelTypes = ["General", "Food & Dining", "Transportation", "Accommodation", "Shopping", "Emergency"]

// Phrases data
const phrasesData = {
  fr: {
    General: [
      { phrase: "Bonjour", translation: "Hello" },
      { phrase: "Au revoir", translation: "Goodbye" },
      { phrase: "Merci", translation: "Thank you" },
      { phrase: "S'il vous plaît", translation: "Please" },
      { phrase: "Excusez-moi", translation: "Excuse me" },
      { phrase: "Parlez-vous anglais?", translation: "Do you speak English?" },
    ],
    "Food & Dining": [
      { phrase: "Je voudrais réserver une table", translation: "I would like to reserve a table" },
      { phrase: "L'addition, s'il vous plaît", translation: "The bill, please" },
      { phrase: "C'était délicieux", translation: "It was delicious" },
      { phrase: "Je suis végétarien", translation: "I am vegetarian" },
      { phrase: "De l'eau, s'il vous plaît", translation: "Water, please" },
    ],
    Transportation: [
      { phrase: "Où est la station de métro?", translation: "Where is the subway station?" },
      { phrase: "Combien coûte un billet?", translation: "How much is a ticket?" },
      { phrase: "Je voudrais aller à...", translation: "I would like to go to..." },
      { phrase: "Pouvez-vous m'appeler un taxi?", translation: "Can you call me a taxi?" },
    ],
    Accommodation: [
      { phrase: "J'ai une réservation", translation: "I have a reservation" },
      { phrase: "Où est ma chambre?", translation: "Where is my room?" },
      { phrase: "La clé, s'il vous plaît", translation: "The key, please" },
      { phrase: "Y a-t-il le Wi-Fi?", translation: "Is there Wi-Fi?" },
    ],
    Shopping: [
      { phrase: "Combien ça coûte?", translation: "How much does it cost?" },
      { phrase: "C'est trop cher", translation: "It's too expensive" },
      { phrase: "Je voudrais acheter ceci", translation: "I would like to buy this" },
      { phrase: "Acceptez-vous les cartes de crédit?", translation: "Do you accept credit cards?" },
    ],
    Emergency: [
      { phrase: "Au secours!", translation: "Help!" },
      { phrase: "Appelez une ambulance!", translation: "Call an ambulance!" },
      { phrase: "J'ai besoin d'un médecin", translation: "I need a doctor" },
      { phrase: "J'ai perdu mon passeport", translation: "I lost my passport" },
    ],
  },
  es: {
    General: [
      { phrase: "Hola", translation: "Hello" },
      { phrase: "Adiós", translation: "Goodbye" },
      { phrase: "Gracias", translation: "Thank you" },
      { phrase: "Por favor", translation: "Please" },
      { phrase: "Disculpe", translation: "Excuse me" },
      { phrase: "¿Habla inglés?", translation: "Do you speak English?" },
    ],
    "Food & Dining": [
      { phrase: "Quisiera reservar una mesa", translation: "I would like to reserve a table" },
      { phrase: "La cuenta, por favor", translation: "The bill, please" },
      { phrase: "Estaba delicioso", translation: "It was delicious" },
      { phrase: "Soy vegetariano", translation: "I am vegetarian" },
      { phrase: "Agua, por favor", translation: "Water, please" },
    ],
    // Other categories would be filled similarly
    Transportation: [
      { phrase: "¿Dónde está la estación de metro?", translation: "Where is the subway station?" },
      { phrase: "¿Cuánto cuesta un billete?", translation: "How much is a ticket?" },
      { phrase: "Quisiera ir a...", translation: "I would like to go to..." },
      { phrase: "¿Puede llamarme un taxi?", translation: "Can you call me a taxi?" },
    ],
    Accommodation: [
      { phrase: "Tengo una reserva", translation: "I have a reservation" },
      { phrase: "¿Dónde está mi habitación?", translation: "Where is my room?" },
      { phrase: "La llave, por favor", translation: "The key, please" },
      { phrase: "¿Hay Wi-Fi?", translation: "Is there Wi-Fi?" },
    ],
    Shopping: [
      { phrase: "¿Cuánto cuesta?", translation: "How much does it cost?" },
      { phrase: "Es demasiado caro", translation: "It's too expensive" },
      { phrase: "Quisiera comprar esto", translation: "I would like to buy this" },
      { phrase: "¿Aceptan tarjetas de crédito?", translation: "Do you accept credit cards?" },
    ],
    Emergency: [
      { phrase: "¡Socorro!", translation: "Help!" },
      { phrase: "¡Llame una ambulancia!", translation: "Call an ambulance!" },
      { phrase: "Necesito un médico", translation: "I need a doctor" },
      { phrase: "He perdido mi pasaporte", translation: "I lost my passport" },
    ],
  },
  // Other languages would be filled similarly
}

// Default to French for other languages in this demo
const getPhrasesForLanguage = (langCode: string, category: string) => {
  if (phrasesData[langCode as keyof typeof phrasesData]) {
    return phrasesData[langCode as keyof typeof phrasesData][category as keyof typeof phrasesData.fr] || []
  }
  return phrasesData.fr[category as keyof typeof phrasesData.fr] || []
}

export default function LanguagePage() {
  const [language, setLanguage] = useState("fr")
  const [travelType, setTravelType] = useState("General")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const phrases = getPhrasesForLanguage(language, travelType)

  const handleCopyPhrase = (index: number, phrase: string) => {
    navigator.clipboard.writeText(phrase)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-green-5">Language Cheat Sheet</h2>
        <p className="text-muted-foreground">Essential phrases for your travels</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Useful Phrases</CardTitle>
            <CardDescription>Common phrases for your trip</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="General" value={travelType} onValueChange={setTravelType}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                {travelTypes.map((type) => (
                  <TabsTrigger key={type} value={type}>
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>

              {travelTypes.map((type) => (
                <TabsContent key={type} value={type} className="space-y-4">
                  {getPhrasesForLanguage(language, type).length === 0 ? (
                    <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
                      <p className="text-sm text-muted-foreground">No phrases available for this category.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {getPhrasesForLanguage(language, type).map((item, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex-1">
                            <div className="font-medium">{item.phrase}</div>
                            <div className="text-sm text-muted-foreground">{item.translation}</div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleCopyPhrase(index, item.phrase)}>
                            {copiedIndex === index ? (
                              <Check className="h-4 w-4 text-green-1" />
                            ) : (
                              <Copy className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>Choose your destination language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">Select Language</div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg bg-green-3 p-4">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-green-1" />
                    <div className="font-medium">Language Tips</div>
                  </div>
                  <div className="mt-2 text-sm">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Try to learn basic greetings and thank you phrases</li>
                      <li>Speak slowly and clearly when using these phrases</li>
                      <li>Use hand gestures to help communicate</li>
                      <li>Download an offline translation app as backup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pronunciation Guide</CardTitle>
              <CardDescription>How to sound more natural</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {language === "fr" && (
                  <div className="space-y-2">
                    <div className="font-medium">French Pronunciation Tips</div>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>The letter 'r' is pronounced at the back of the throat</li>
                      <li>Final consonants are often silent</li>
                      <li>Nasal vowels are pronounced through the nose</li>
                      <li>Stress is usually on the last syllable of a word</li>
                    </ul>
                  </div>
                )}
                {language === "es" && (
                  <div className="space-y-2">
                    <div className="font-medium">Spanish Pronunciation Tips</div>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>The letter 'j' is pronounced like 'h' in English</li>
                      <li>The letter 'ñ' is pronounced like 'ny' in "canyon"</li>
                      <li>Roll your 'r's slightly for better pronunciation</li>
                      <li>Vowels are pronounced clearly and consistently</li>
                    </ul>
                  </div>
                )}
                {!["fr", "es"].includes(language) && (
                  <div className="flex h-20 items-center justify-center rounded-lg border border-dashed">
                    <p className="text-sm text-muted-foreground">
                      Pronunciation guide not available for this language yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

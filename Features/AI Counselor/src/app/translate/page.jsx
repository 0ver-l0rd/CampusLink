"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, Book, FileText } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const languages = [
  { code: 'ar', name: 'Arabic' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'zh', name: 'Chinese' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'kab', name: 'Kabyle' },
  { code: 'ko', name: 'Korean' },
  { code: 'oc', name: 'Occitan' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'es', name: 'Spanish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'vi', name: 'Vietnamese' },
]

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState(null)

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]
    setFile(uploadedFile)

    if (uploadedFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSourceText(e.target.result)
      }
      reader.readAsText(uploadedFile)
    }
  }

  const handleTranslate = async () => {
    if (!sourceText || !targetLanguage) {
      toast.error('Please provide text to translate and select a target language.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: sourceText,
          source: 'auto',
          target: targetLanguage,
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const data = await response.json()
      setTranslatedText(data.translatedText)
      toast.success('Translation completed successfully!')
    } catch (error) {
      console.error('Translation error:', error)
      toast.error('An error occurred during translation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Book and File Translation</h1>
      <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="text">Text Translation</TabsTrigger>
          <TabsTrigger value="file">File Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text Translation</CardTitle>
              <CardDescription>Enter the text you want to translate</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text to translate"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="min-h-[200px] mb-4"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>Upload a book or text file for translation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <Label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">TXT, PDF, EPUB (MAX. 10MB)</p>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".txt,.pdf,.epub"
                  />
                </Label>
              </div>
              {file && (
                <div className="mt-4 flex items-center">
                  <Book className="mr-2" />
                  <span>{file.name}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Translation Options</CardTitle>
          <CardDescription>Select the target language for translation</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setTargetLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select target language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button onClick={handleTranslate} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Translating...
              </>
            ) : (
              'Translate'
            )}
          </Button>
        </CardFooter>
      </Card>

      {translatedText && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Translated Text</CardTitle>
            <CardDescription>Result of the translation</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={translatedText}
              readOnly
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(translatedText)
                toast.success('Translated text copied to clipboard!')
              }}
            >
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
"use client";

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, FileText } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Document, Page, pdfjs } from 'react-pdf'

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const GOOGLE_TRANSLATE_API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY'

const languages = [
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Albanian' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hy', name: 'Armenian' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'eu', name: 'Basque' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bn', name: 'Bengali' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'ca', name: 'Catalan' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'ny', name: 'Chichewa' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'co', name: 'Corsican' },
  { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian' },
  { code: 'tl', name: 'Filipino' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'fy', name: 'Frisian' },
  { code: 'gl', name: 'Galician' },
  { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'Hawaiian' },
  { code: 'iw', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jw', name: 'Javanese' },
  { code: 'kn', name: 'Kannada' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'km', name: 'Khmer' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'ko', name: 'Korean' },
  { code: 'ku', name: 'Kurdish (Kurmanji)' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'lo', name: 'Lao' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'ne', name: 'Nepali' },
  { code: 'no', name: 'Norwegian' },
  { code: 'or', name: 'Odia (Oriya)' },
  { code: 'ps', name: 'Pashto' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sm', name: 'Samoan' },
  { code: 'gd', name: 'Scots Gaelic' },
  { code: 'sr', name: 'Serbian' },
  { code: 'st', name: 'Sesotho' },
  { code: 'sn', name: 'Shona' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhala' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' },
  { code: 'es', name: 'Spanish' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' },
  { code: 'tt', name: 'Tatar' },
  { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ug', name: 'Uyghur' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'cy', name: 'Welsh' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'zu', name: 'Zulu' }
];

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [pdfText, setPdfText] = useState('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile)
      extractTextFromPdf(uploadedFile)
    } else {
      toast.error('Please upload a valid PDF file.')
    }
  }

  const extractTextFromPdf = async (pdfFile: File) => {
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target?.result as ArrayBuffer)
        const pdf = await pdfjs.getDocument(typedarray).promise
        let fullText = ''

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          const pageText = content.items.map((item: any) => item.str).join(' ')
          fullText += pageText + ' '
        }

        setPdfText(fullText.trim())
        setSourceText(fullText.trim())
      }
      reader.readAsArrayBuffer(pdfFile)
    } catch (error) {
      console.error('Error extracting text from PDF:', error)
      toast.error('Failed to extract text from the PDF. Please try again.')
    }
  }

  const handleTranslate = async () => {
    if (!sourceText || !targetLanguage) {
      toast.error('Please provide text to translate and select a target language.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: sourceText,
            target: targetLanguage,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const data = await response.json()
      setTranslatedText(data.data.translations[0].translatedText)
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
      <h1 className="text-3xl font-bold mb-6">PDF and Text Translation</h1>
      <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="text">Text Translation</TabsTrigger>
          <TabsTrigger value="pdf">PDF Upload</TabsTrigger>
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
        <TabsContent value="pdf">
          <Card>
            <CardHeader>
              <CardTitle>PDF Upload</CardTitle>
              <CardDescription>Upload a PDF file for translation</CardDescription>
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF files only</p>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf"
                  />
                </Label>
              </div>
              {file && (
                <div className="mt-4 flex items-center">
                  <FileText className="mr-2" />
                  <span>{file.name}</span>
                </div>
              )}
              {pdfText && (
                <Textarea
                  value={pdfText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="mt-4 min-h-[200px]"
                  placeholder="Extracted PDF text will appear here. You can edit it before translation."
                />
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
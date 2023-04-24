export interface Result {
	status: string
	data: Data
}

export interface Data {
	translatedText: string
	detectedSourceLanguage: DetectedSourceLanguage
}

export interface DetectedSourceLanguage {
	code: string
	name: string
}

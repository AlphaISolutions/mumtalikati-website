export class Faqs{
    id!: number
    isvisible!: boolean
    question!: string
    faqsanswer!: Faqsanswer[]
  }
  
  export class Faqsanswer{
    faqAnswers!: string
  }
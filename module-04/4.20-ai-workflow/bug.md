```
Error Log:
TypeError: Cannot read properties of undefined (reading 'map')
    at QuizPage (QuizPage.tsx:47:22)

Code ที่เกี่ยวข้อง (QuizPage.tsx บรรทัด 40-55):
const { data: quizData } = useQuery({
  queryKey: ['quiz', subjectId],
  queryFn: () => fetchQuizQuestions(subjectId),
})

const questions = quizData.questions.map((q) => ({
  id: q.id,
  text: q.question,
}))

สิ่งที่ทำก่
```

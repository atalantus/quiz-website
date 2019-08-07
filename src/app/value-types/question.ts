export class Question {
  public question: string;
  public answers: string[];
  public id: number;
  public correct: number;

  public loadData(data) {
    this.question = data.question;
    this.answers = [
      data.answer1,
      data.answer2,
      data.answer3,
      data.answer4
    ];
    this.id = data.id;
    this.correct = data.correct ? data.correct : '';
  }
}

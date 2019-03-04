export class Question {
  public question: string;
  public answers: string[];

  public loadData(data) {
    this.question = data.question;
    this.answers = [
      data.answer1,
      data.answer2,
      data.answer3,
      data.answer4
    ];
  }
}

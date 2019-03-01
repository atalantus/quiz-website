export class Question {
  public question: string;
  public answers: string[];

  public loadData(data) {
    this.question = data.question;
    this.answers = [
      data.answers[0],
      data.answers[1],
      data.answers[2],
      data.answers[3]
    ];
  }
}

export class ToDo {
  description: string;
  state: boolean;
  constructor(description: string) {
    this.description = description;
    this.state = true;
  }
}

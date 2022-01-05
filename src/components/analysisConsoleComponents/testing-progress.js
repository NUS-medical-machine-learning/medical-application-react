
export class TestingProgress {
  static New = new TestingProgress("New");
  static SubjectIdReceived = new TestingProgress("SubjectIdReceived");
  static AnalyzingStarted = new TestingProgress("AnalyzingStarted");
  static AnalyzingStopped = new TestingProgress("AnalyzingStopped");
  static DataSent = new TestingProgress("DataSent");
  static Finished = new TestingProgress("Finished");

  constructor(progressName) {
    this.progressName = progressName;
  }

  get fullProgressName() {
    return this.progressName;
  }
}

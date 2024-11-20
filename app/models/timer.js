class TimerModel {
  // Constructor
  constructor({ id, title, duration, order, type, createdAt }) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.order = order;
    this.type = type;
    this.createdAt = createdAt;
  }

  get minutes() {
    return Math.floor(this.duration / 60);
  }

  get seconds() {
    return this.duration % 60;
  }
}

export default TimerModel;

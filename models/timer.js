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

  get totalTimeStr() {
    return `${this.minutes.toString().padStart(2, "0")}:${this.seconds
      .toString()
      .padStart(2, "0")}`;
  }

  // 定义TYPE
  static TYPE = {
    TOMATO: 1001,
    REST: 1002,
  };
}

export default TimerModel;

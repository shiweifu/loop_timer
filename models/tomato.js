import TimerModel from "./timer";

class TomatoModel {
  constructor({ id, title, duration, type, timerId, createdAt }) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.type = type;
    this.timerId = timerId;
    this.createdAt = createdAt;
  }

  get tomatoType() {
    if (this.type === TimerModel.TYPE.REST) {
      return "休息";
    } else {
      return "专注";
    }
  }

  get tomatoTypeStr() {
    if (this.type === TimerModel.TYPE.REST) {
      return "休息";
    } else {
      return "专注";
    }
  }

  get tomatoDurationStr() {
    const minutes = Math.floor(this.duration / 60);
    const remainingSeconds = this.duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  get createdAtStr() {
    if (!this.createdAt) {
      return "";
    }
    return `${this.createdAt.getFullYear()}-${this.createdAt.getMonth()}-${this.createdAt.getDate()}`;
  }
}

export default TomatoModel;

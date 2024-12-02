class DayModel {
  constructor({ dateStr, tomatos }) {
    this.dateStr = dateStr;
    this.tomatos = tomatos;
    this.tomatoDuration = 0;
    this.restDuration = 0;

    tomatos.forEach((tomato) => {
      if (tomato.type === TimerModel.TYPE.TOMATO) {
        this.tomatoDuration += tomato.duration;
      } else {
        this.restDuration += tomato.duration;
      }
    });
  }

  get tomatoMinutes() {
    return Math.floor(this.tomatoDuration / 60);
  }

  get restMinutes() {
    return Math.floor(this.restDuration / 60);
  }
}

class Sequence {
  constructor() {
    this._id = 0;
  }
  
  get id() {
    return this._id++;
  }
}

export default Sequence;
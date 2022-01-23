export class Card extends Component {
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._description = data.description;
    this._time = data.time;
    this._serving = data.serving;
    this._ustensils = data.ustensils;
    this._ingredients = data.ingredients;
    this._appliance = data.applicance;
  }
}

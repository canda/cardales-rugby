import React from 'react';
import { Link } from 'gatsby';

export default class AccountForm extends React.Component {
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.onChange({
      ...this.props.account,
      [name]: value
    });
  }
  render() {
    const { account } = this.props;
    return (
      <div>
        <div className="field">
          <label className="label">DNI</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              name="dni"
              value={account.dni}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              name="firstname"
              value={account.firstname}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Apellido</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              name="lastname"
              value={account.lastname}
            />
          </div>
        </div>
      </div>
    );
  }
}

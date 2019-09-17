import React from 'react';
import { Radio, RadioGroup } from 'react-radio-group';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { Account } from '../types/Account';
import { getAccountsRef } from '../services/firebase';

type Movement = {
  multiplier: number;
  value: number;
  date: number;
};

class Balance extends React.Component<{ account: Account }, { newMovement: Movement }> {
  state = { newMovement: { multiplier: 1, value: 0, date: new Date().valueOf() } };
  submit = async () => {
    const { account } = this.props;
    const { newMovement } = this.state;
    console.log({ account, newMovement });

    const firebase = await import('firebase/app');

    const accountsRef = await getAccountsRef();
    accountsRef.doc(account.id).update({
      movements: firebase.firestore.FieldValue.arrayUnion(newMovement)
    });
  };
  handleDateChange = date => {
    this.setState(({ newMovement }) => ({ newMovement: { ...newMovement, date: date.valueOf() } }));
  };
  handleRadioChange = multiplier => {
    this.setState(({ newMovement }) => ({ newMovement: { ...newMovement, multiplier } }));
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(({ newMovement }) => ({ newMovement: { ...newMovement, [name]: value } }));
  };
  render() {
    const { newMovement } = this.state;
    return (
      <div>
        <RadioGroup
          name="multiplier"
          selectedValue={newMovement.multiplier}
          onChange={this.handleRadioChange}
        >
          <Radio value={1} />
          Pago
          <Radio value={-1} />
          Deuda
        </RadioGroup>
        <div className="field">
          <label>$</label>
          <input
            type="number"
            name="value"
            value={newMovement.value}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="field">
          <label>Fecha</label>
          <DayPickerInput value={new Date(newMovement.date)} onDayChange={this.handleDateChange} />
        </div>

        <button onClick={this.submit} className="button">
          Cargar Movimiento
        </button>
      </div>
    );
  }
}

export default Balance;

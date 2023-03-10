import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import PizzaCard from './PizzaCard';
import { Button as SaveButton } from '../components';
import { addNewPizza } from '../redux/slices/pizzasSlice';

class AddForm extends React.Component {
  state = {
    name: '',
    price: '',
    rating: 5,
    category: 0,
    images: {
      26: '',
      30: '',
      40: '',
    },
    types: [],

    have26: false,
    have30: false,
    have40: false,
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onPriceChange = (e) => {
    this.setState({ price: e.target.value });
  };

  onRatingChange = (e) => {
    this.setState({ rating: e.target.value });
  };

  haveImageBtnClick = (size) => {
    const key = `have${size}`;

    this.setState((prev) => {
      let hasSize = prev[key];
      if (hasSize) {
        return { [key]: !hasSize, images: { ...prev.images, [size]: '' } };
      }
      return { [key]: !hasSize };
    });
  };

  onTypeChange = (e) => {
    const value = +e.target.value;
    this.setState((prev) => {
      let types = [...prev.types];
      if (e.target.checked) {
        types.push(value);
      } else {
        types = types.filter((el) => el != value);
      }

      return { types };
    });
  };

  onImageUrlsChange = (e, size) => {
    this.setState((prev) => ({
      images: {
        ...prev.images,
        [size]: e.target.value,
      },
    }));
  };

  onCategorChange = e => {
    this.setState({category: parseInt(e.target.value)});
  }

  getPizzaState = () => {
    let { name, price, rating, types, images, category } = this.state;
    let previewState = {
      name,
      price,
      rating,
      types,
      category,
      imageUrls: [],
      sizes: [],
    };

    for (let keyValues of Object.entries(images)) {
      const [key, value] = keyValues;

      if (value != '') {
        previewState.sizes.push(+key);
        previewState.imageUrls.push(value);
      }
    }
    return previewState;
  };

  validateState = () => {
    const { name, price, sizes, imageUrls, types } = this.getPizzaState();
    const withEmojis = /\p{Extended_Pictographic}/u;
    if (!name || !price || !sizes.length || !imageUrls.length || !types.length) {
      return '???? ?????? ???????? ??????????????????!';
    }
    else if (withEmojis.test(name)) {
      return "???????????????? ???? ???????????? ?????????????????? ????????????";
    }
    else if (isNaN(price)) {
      return "???????? ???????????? ???????? ????????????!";
    }
    else if (this.props.items.some(el => el.name == name)) {
      return "?????????? ?? ?????????? ?????????????????? ?????? ????????????????????!";
    }
    return "??????????????!";
  };

  savePizza = (e) => {
    e.preventDefault();
    let resValidation = this.validateState();
    if (this.validateState() == "??????????????!") {
      this.props.dispatch(addNewPizza(this.getPizzaState()));
    } else {
      alert(resValidation);
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.savePizza}>
          <Form.Group className="mb-3">
            <Form.Label>????????????????</Form.Label>
            <Form.Control
              placeholder="?????????????? ????????????????"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>????????</Form.Label>
            <Form.Control
              placeholder="???????? ???"
              value={this.state.price}
              onChange={this.onPriceChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>??????????????: {this.state.rating}</Form.Label>
            <Form.Range min={1} max={10} value={this.state.rating} onChange={this.onRatingChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>????????????</Form.Label>
            {[26, 30, 40].map((el, i) => (
              <InputGroup className="mb-3">
                <Button variant="outline-secondary" onClick={() => this.haveImageBtnClick(el)}>
                  {el} ????.
                </Button>
                {this.state[`have${el}`] ? (
                  <FormControl
                    placeholder="URL ??????????????????????"
                    value={this.state.images[el]}
                    onChange={(e) => this.onImageUrlsChange(e, el)}
                  />
                ) : (
                  <FormControl placeholder="URL ??????????????????????" value="" disabled />
                )}
              </InputGroup>
            ))}
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label>??????????????????</Form.Label>
            <Form.Select aria-label="Default select example" value={this.state.category} onChange={this.onCategorChange}>
              <option value="0">????????????</option>
              <option value="1">????????????????????????????</option>
              <option value="2">??????????</option>
              <option value="3">????????????</option>
              <option value="4">????????????????</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>??????</Form.Label>
            <div>
              <Form.Check
                inline
                label="????????????"
                value="0"
                type="checkbox"
                onChange={this.onTypeChange}
              />
              <Form.Check
                inline
                label="????????????????????????"
                value="1"
                type="checkbox"
                onChange={this.onTypeChange}
              />
            </div>
          </Form.Group>
          <div className="d-flex justify-content-center mb-3">
            <SaveButton>??????????????????</SaveButton>
          </div>
        </Form>
        <div className="d-flex align-items-center flex-column">
          <h2 className="mb-3">????????????</h2>
          <PizzaCard {...this.getPizzaState()} isPreview />
        </div>
      </>
    );
  }
}

export default AddForm;

import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import PizzaCard from "./PizzaCard";
import { Button as SaveButton } from "../components";
import { updatePizza } from "../redux/slices/pizzasSlice";

class EditPizzaForm extends React.Component {
  // Первоначальная инициализация
  constructor(props) {
    super(props);

    const { id, name, rating, imageUrls, sizes, types, price, category } = props.pizza;

    this.state = {
      id,
      name,
      rating,
      types,
      category,
      price,

      images: {
        26: "",
        30: "",
        40: "",
      },

      have26: sizes.includes(26),
      have30: sizes.includes(30),
      have40: sizes.includes(40),
    };

    sizes.forEach((el, i) => {
      this.state.images[el] = imageUrls[i];
    });

    console.log(this.state);
  }

  componentDidUpdate() {
    console.log('Компонент обновлен - ', this.state);
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
        return { [key]: !hasSize, images: { ...prev.images, [size]: "" } };
      }
      return { [key]: !hasSize };
    });
  };

  // Обновление types в state
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

  // Обновление изображения в state
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

  // Получение отформатированного state
  getPizzaState = () => {
    let { id, name, price, rating, types, images, category } = this.state;
    let previewState = {
      id,
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

      if (value != "") {
        previewState.sizes.push(+key);
        previewState.imageUrls.push(value);
      }
    }
    return previewState;
  };


  // Валидация для unit-тестов
  validateState = () => {
    const { name, price, sizes, imageUrls, types } = this.getPizzaState();
    const withEmojis = /\p{Extended_Pictographic}/u;
    if (!name || !price || !sizes.length || !imageUrls.length || !types.length) {
      return 'Не все поля заполнены!';
    }
    else if (withEmojis.test(name)) {
      return "Название не должно содержать эмодзи!";
    }
    else if (isNaN(price)) {
      return "Цена должна быть числом!";
    }
    else if (this.props.items.some(el => el.name == name)) {
      return "Пицца с таким названием уже существует!";
    }
    return "Успешно!";
  };

  // put запрос на обновление товара
  savePizza = (e) => {
    e.preventDefault();
    let resValidation = this.validateState();
    if (this.validateState() == "Успешно!") {
      this.props.dispatch(updatePizza(this.getPizzaState()));
    } else {
      alert(resValidation);
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.savePizza}>
          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              placeholder="Введите название"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Цена</Form.Label>
            <Form.Control
              placeholder="Цена ₽"
              value={this.state.price}
              onChange={this.onPriceChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Рейтинг: {this.state.rating}</Form.Label>
            <Form.Range
              min={1}
              max={10}
              value={this.state.rating}
              onChange={this.onRatingChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Размер</Form.Label>
            {[26, 30, 40].map((el, i) => (
              <InputGroup className="mb-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => this.haveImageBtnClick(el)}
                >
                  {el} см.
                </Button>
                {this.state[`have${el}`] ? (
                  <FormControl
                    placeholder="URL изображения"
                    value={this.state.images[el]}
                    onChange={(e) => this.onImageUrlsChange(e, el)}
                  />
                ) : (
                  <FormControl
                    placeholder="URL изображения"
                    value={this.state.images[el]}
                    disabled
                  />
                )}
              </InputGroup>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Категория</Form.Label>
            <Form.Select aria-label="Default select example" value={this.state.category} onChange={this.onCategorChange}>
              <option value="0">Мясные</option>
              <option value="1">Вегетарианская</option>
              <option value="2">Гриль</option>
              <option value="3">Острые</option>
              <option value="4">Закрытые</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Тип</Form.Label>
            <div>
              <Form.Check
                inline
                checked={this.state.types.includes(0)}
                label="Тонкое"
                value="0"
                type="checkbox"
                onChange={this.onTypeChange}
              />
              <Form.Check
                inline
                checked={this.state.types.includes(1)}
                label="Традиционное"
                value="1"
                type="checkbox"
                onChange={this.onTypeChange}
              />
            </div>
          </Form.Group>
          <div className="d-flex justify-content-center mb-3">
            <SaveButton>Сохранить</SaveButton>
          </div>
        </Form>
        <div className="d-flex align-items-center flex-column">
          <h2 className="mb-3">Превью</h2>
          <PizzaCard {...this.getPizzaState()} isPreview />
        </div>
      </>
    );
  }
}
export default EditPizzaForm;

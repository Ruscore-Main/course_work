using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaTestDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaTestDB.Controllers
{

    public class UserJson
    {
        public int id;
        public string login;
        public string password;
        public string role;
        public List<CartItemJson> cart = new List<CartItemJson>();
    }

    public class UserRequest
    {
        public string login;
        public string password;
    };

    public class CartItemJson
    {
        public int id;
        public string name;
        public int price;
        public int category;
        public int size;
        public string imageUrl;
        public int count;
        public int userId;
    }

    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {

        private PizzaContext? _db;

        public UserController(PizzaContext pizzaContext)
        {
            _db = pizzaContext;
        }

        // POST /registration
        // Регистрация пользователя
        [Route("registration")]
        [HttpPost]
        public async Task<ActionResult<Pizza>> Registration(UserRequest ur)
        {
            string login = ur.login;
            string password = ur.password;
            List<User> users = await _db.Users.ToListAsync();
            if (users.Any(el => el.Login == login))
            {
                return BadRequest();
            }

            User newUser = new User()
            {
                Login = login,
                Password = password,
                Role = "User"
            };

            await _db.Users.AddAsync(newUser);
            await _db.SaveChangesAsync();

            UserJson user = new UserJson()
            {
                id = newUser.Id,
                login = newUser.Login,
                password = newUser.Password,
                role = newUser.Role,
                cart = new List<CartItemJson>()
            };

            return new JsonResult(user);
        }

        // POST /authorization
        // Авторизация пользователя
        [Route("authorization")]
        [HttpPost]
        public async Task<ActionResult<Pizza>> Authorization(UserRequest ur)
        {
            string login = ur.login;
            string password = ur.password;
            List<User> users = await _db.Users.ToListAsync();
            User currentUser = users.FirstOrDefault(el => el.Login == login && el.Password == password);
            if (currentUser == null)
            {
                return NotFound();
            }

            UserJson user = new UserJson()
            {
                id = currentUser.Id,
                login = currentUser.Login,
                password = currentUser.Password,
                role = currentUser.Role,
            };

            List<CartItemJson> cart = new List<CartItemJson>();

            foreach (CartItem cartItem in currentUser.CartItems)
            {
                cart.Add(new CartItemJson()
                {
                    id = cartItem.Id,
                    name = cartItem.Name,
                    price = cartItem.Price,
                    category = cartItem.Category,
                    size = cartItem.Size,
                    imageUrl = cartItem.ImageUrl,
                    count = cartItem.Count,
                    userId = currentUser.Id
                });
            }

            user.cart = cart;

            return new JsonResult(user);
        }

        // GET /cart
        // ОЧИЩАЕТ КОРЗНи

        // POST /cart
        // Добавление товара в корзину
        [Route("cart")]
        [HttpPost]
        public async Task<ActionResult<Pizza>> AddItemToCart(CartItemJson item)
        {
            User currentUser = await _db.Users.FirstOrDefaultAsync(el => el.Id == item.userId);

            if (currentUser == null)
            {
                return NotFound();
            }

            CartItem currentItem = currentUser.CartItems.FirstOrDefault(el => el.Id == item.id);

            if (currentItem != null)
            {
                currentItem.Count += 1;
                await _db.SaveChangesAsync();
                return Ok(currentItem);
            }

            CartItem newItem = new CartItem()
            {
                Name = item.name,
                Price = item.price,
                Category = item.category,
                Size = item.size,
                ImageUrl = item.imageUrl,
                Count = 1
            };

            currentUser.CartItems.Add(newItem);

            await _db.SaveChangesAsync();
            return new JsonResult(newItem);

        }

        // DELETE /cart
        // Удаление товара из корзины
        [Route("cart")]
        [HttpDelete]
        public async Task<ActionResult<Pizza>> RemoveItemFromCart(CartItemJson item)
        {
            User currentUser = await _db.Users.FirstOrDefaultAsync(el => el.Id == item.userId);

            if (currentUser == null)
            {
                return NotFound();
            }

            currentUser.CartItems.Remove(currentUser.CartItems.FirstOrDefault(el => el.Id == item.id));
            await _db.SaveChangesAsync();

            return Ok(item);
        }
    }
}
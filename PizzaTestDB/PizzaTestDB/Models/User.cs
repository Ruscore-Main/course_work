using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaTestDB.Models
{
    public class User
    {

        public User()
        {
            this.CartItems = new List<CartItem>();
        }

        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public virtual ICollection<CartItem> CartItems { get; set; }
    }
}

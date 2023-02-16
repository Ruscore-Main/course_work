using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaTestDB.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
    
        public string Name { get; set; }
        public int Price { get; set; }
        public int Category { get; set; }
        public string Type { get; set; }
        public int Size { get; set; }
        public string ImageUrl { get; set; }
        public int Count { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaTestDB.Models
{
    public class Pizza_Type
    {
        [Key]
        public int Id { get; set; }
        public int PizzaId { get; set; }
        public virtual Pizza Pizza { get; set; }

        public int TypeId { get; set; }
        public virtual Type Type { get; set; }

    }
}

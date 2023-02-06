using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaTestDB.Models
{
    public class Type
    {
        [Key]
        public int Id { get; set; }
        public int TypeValue { get; set; }

        public virtual List<Pizza_Type> Pizza_Types { get; set; }
    }
}

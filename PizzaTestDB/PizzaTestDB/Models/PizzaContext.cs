using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaTestDB.Models
{
    public class PizzaContext : DbContext
    {
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<PizzaImage> PizzaImages { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Pizza_Type> Pizza_Types { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CartItem> CartItems { get; set; }



        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseMySql("server=localhost;port=3307;user=root;password=root;database=pizzadata")
                .UseLoggerFactory(LoggerFactory.Create(b =>
                b.AddConsole().AddFilter(level => level >= LogLevel.Information)))
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();

        }*/

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies();
        }

        public PizzaContext(DbContextOptions<PizzaContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pizza_Type>()
            .HasOne(p => p.Pizza)
            .WithMany(pt => pt.Pizza_Types)
            .HasForeignKey(pi => pi.PizzaId);

            modelBuilder.Entity<Pizza_Type>()
            .HasOne(t => t.Type)
            .WithMany(pt => pt.Pizza_Types)
            .HasForeignKey(pi => pi.TypeId);

            modelBuilder.Entity<PizzaImage>()
                .HasOne(pi => pi.Pizza)
                .WithMany(p => p.Images);

        }
    }
}

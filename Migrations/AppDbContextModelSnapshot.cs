﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ShiftTracker.Angular.Data;

#nullable disable

namespace ShiftTracker.Angular.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.HasSequence("EntityFrameworkHiLoSequence")
                .IncrementsBy(10);

            modelBuilder.Entity("ShiftTracker.Angular.Models.Break", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("time");

                    b.Property<int>("ShiftId")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.HasKey("Id");

                    b.HasIndex("ShiftId");

                    b.ToTable("Breaks", (string)null);

                    b.HasData(
                        new
                        {
                            Id = -1,
                            Duration = new TimeSpan(0, 0, 30, 0, 0),
                            EndTime = new TimeSpan(0, 13, 0, 0, 0),
                            ShiftId = -1,
                            StartTime = new TimeSpan(0, 12, 30, 0, 0)
                        },
                        new
                        {
                            Id = -2,
                            Duration = new TimeSpan(0, 1, 0, 0, 0),
                            EndTime = new TimeSpan(0, 14, 0, 0, 0),
                            ShiftId = -1,
                            StartTime = new TimeSpan(0, 15, 0, 0, 0)
                        },
                        new
                        {
                            Id = -3,
                            Duration = new TimeSpan(0, 1, 0, 0, 0),
                            EndTime = new TimeSpan(0, 10, 0, 0, 0),
                            ShiftId = -2,
                            StartTime = new TimeSpan(0, 9, 0, 0, 0)
                        },
                        new
                        {
                            Id = -4,
                            Duration = new TimeSpan(0, 0, 15, 0, 0),
                            EndTime = new TimeSpan(0, 14, 0, 0, 0),
                            ShiftId = -2,
                            StartTime = new TimeSpan(0, 13, 45, 0, 0)
                        });
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.DailyRoutePlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DayOfWeek")
                        .HasColumnType("int");

                    b.Property<int?>("RunId")
                        .HasColumnType("int");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("WindowCloseTime")
                        .HasColumnType("time");

                    b.Property<TimeSpan?>("WindowOpenTime")
                        .HasColumnType("time");

                    b.HasKey("Id");

                    b.HasIndex("RunId");

                    b.HasIndex("ShopId");

                    b.ToTable("DailyRoutes");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            DayOfWeek = 1,
                            RunId = -1,
                            ShopId = -1,
                            WindowCloseTime = new TimeSpan(0, 11, 15, 0, 0),
                            WindowOpenTime = new TimeSpan(0, 10, 15, 0, 0)
                        },
                        new
                        {
                            Id = -2,
                            DayOfWeek = 1,
                            RunId = -1,
                            ShopId = -2,
                            WindowCloseTime = new TimeSpan(0, 13, 15, 0, 0),
                            WindowOpenTime = new TimeSpan(0, 12, 15, 0, 0)
                        },
                        new
                        {
                            Id = -3,
                            DayOfWeek = 1,
                            RunId = -1,
                            ShopId = -3,
                            WindowCloseTime = new TimeSpan(0, 14, 30, 0, 0),
                            WindowOpenTime = new TimeSpan(0, 14, 15, 0, 0)
                        },
                        new
                        {
                            Id = -4,
                            DayOfWeek = 1,
                            RunId = -2,
                            ShopId = -4,
                            WindowCloseTime = new TimeSpan(0, 11, 15, 0, 0),
                            WindowOpenTime = new TimeSpan(0, 10, 15, 0, 0)
                        },
                        new
                        {
                            Id = -5,
                            DayOfWeek = 1,
                            RunId = -2,
                            ShopId = -5,
                            WindowCloseTime = new TimeSpan(0, 13, 15, 0, 0),
                            WindowOpenTime = new TimeSpan(0, 12, 15, 0, 0)
                        });
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.Run", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.HasKey("Id");

                    b.HasIndex("Number")
                        .IsUnique();

                    b.ToTable("Runs", (string)null);

                    b.HasData(
                        new
                        {
                            Id = -1,
                            Number = 68,
                            StartTime = new TimeSpan(0, 8, 0, 0, 0)
                        },
                        new
                        {
                            Id = -2,
                            Number = 19,
                            StartTime = new TimeSpan(0, 10, 0, 0, 0)
                        });
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.Shift", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseHiLo(b.Property<int>("Id"), "EntityFrameworkHiLoSequence");

                    b.Property<TimeSpan>("BreakDuration")
                        .HasColumnType("time");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<TimeSpan>("DriveTime")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("OtherWorkTime")
                        .HasColumnType("time");

                    b.Property<int?>("RunId")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("ShiftDuration")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("WorkTime")
                        .HasColumnType("time");

                    b.HasKey("Id");

                    b.HasIndex("Date")
                        .IsUnique();

                    b.HasIndex("RunId");

                    b.ToTable("Shifts", (string)null);

                    b.HasData(
                        new
                        {
                            Id = -1,
                            BreakDuration = new TimeSpan(0, 1, 30, 0, 0),
                            Date = new DateTime(2023, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DriveTime = new TimeSpan(0, 2, 55, 0, 0),
                            EndTime = new TimeSpan(0, 16, 0, 0, 0),
                            OtherWorkTime = new TimeSpan(0, 2, 5, 0, 0),
                            RunId = -2,
                            ShiftDuration = new TimeSpan(0, 8, 0, 0, 0),
                            StartTime = new TimeSpan(0, 8, 0, 0, 0),
                            WorkTime = new TimeSpan(0, 1, 30, 0, 0)
                        },
                        new
                        {
                            Id = -2,
                            BreakDuration = new TimeSpan(0, 0, 30, 0, 0),
                            Date = new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DriveTime = new TimeSpan(0, 2, 0, 0, 0),
                            EndTime = new TimeSpan(0, 16, 0, 0, 0),
                            OtherWorkTime = new TimeSpan(0, 2, 0, 0, 0),
                            RunId = -2,
                            ShiftDuration = new TimeSpan(0, 6, 0, 0, 0),
                            StartTime = new TimeSpan(0, 10, 0, 0, 0),
                            WorkTime = new TimeSpan(0, 1, 30, 0, 0)
                        });
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.Shop", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("County")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("PhoneNumber")
                        .HasMaxLength(20)
                        .HasColumnType("int");

                    b.Property<string>("Postcode")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Street2")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("Name", "Number")
                        .IsUnique();

                    b.ToTable("Shops", (string)null);

                    b.HasData(
                        new
                        {
                            Id = -1,
                            City = "Irthlingborough",
                            County = "Northants",
                            Name = "Tesco",
                            Number = 2006,
                            PhoneNumber = 1536741000,
                            Postcode = "NN95JG",
                            Street = "3 School Mews",
                            Street2 = ""
                        },
                        new
                        {
                            Id = -2,
                            City = "Northampton",
                            County = "Northants",
                            Name = "Tesco",
                            Number = 2005,
                            PhoneNumber = 1604620000,
                            Postcode = "NN38px",
                            Street = "38 Chesham Rise",
                            Street2 = ""
                        },
                        new
                        {
                            Id = -3,
                            City = "Stanwick",
                            County = "Northants",
                            Name = "Tesco",
                            Number = 2004,
                            PhoneNumber = 1536741000,
                            Postcode = "NN96JG",
                            Street = "10 Leighton Close",
                            Street2 = ""
                        },
                        new
                        {
                            Id = -4,
                            City = "Thetford",
                            County = "Suffolk",
                            Name = "Aldi",
                            Number = 121,
                            PhoneNumber = 1842741000,
                            Postcode = "IP242JG",
                            Street = "34 Church Rise",
                            Street2 = ""
                        },
                        new
                        {
                            Id = -5,
                            City = "Brandon",
                            County = "Suffolk",
                            Name = "One Stop",
                            Number = 1223,
                            PhoneNumber = 1842741000,
                            Postcode = "IP20JG",
                            Street = "2 Gander Avenue",
                            Street2 = ""
                        });
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.Break", b =>
                {
                    b.HasOne("ShiftTracker.Angular.Models.Shift", "Shift")
                        .WithMany("Breaks")
                        .HasForeignKey("ShiftId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Shift");
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.DailyRoutePlan", b =>
                {
                    b.HasOne("ShiftTracker.Angular.Models.Run", "Run")
                        .WithMany("RoutePlans")
                        .HasForeignKey("RunId");

                    b.HasOne("ShiftTracker.Angular.Models.Shop", "Shop")
                        .WithMany("DailyRoutePlan")
                        .HasForeignKey("ShopId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Run");

                    b.Navigation("Shop");
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.Shift", b =>
                {
                    b.HasOne("ShiftTracker.Angular.Models.Run", "Run")
                        .WithMany("Shifts")
                        .HasForeignKey("RunId");

                    b.Navigation("Run");
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.Run", b =>
                {
                    b.Navigation("RoutePlans");

                    b.Navigation("Shifts");
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.Shift", b =>
                {
                    b.Navigation("Breaks");
                });

            modelBuilder.Entity("ShiftTracker.Angular.Models.Shop", b =>
                {
                    b.Navigation("DailyRoutePlan");
                });
#pragma warning restore 612, 618
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShiftTracker.Angular.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence(
                name: "EntityFrameworkHiLoSequence",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "Runs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Runs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shops",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Street2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    City = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    County = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Postcode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PhoneNumber = table.Column<int>(type: "int", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shops", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shifts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    BreakDuration = table.Column<TimeSpan>(type: "time", nullable: false),
                    DriveTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    ShiftDuration = table.Column<TimeSpan>(type: "time", nullable: false),
                    OtherWorkTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    WorkTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    RunId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shifts_Runs_RunId",
                        column: x => x.RunId,
                        principalTable: "Runs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DailyRoutes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    WindowOpenTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    WindowCloseTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    RunId = table.Column<int>(type: "int", nullable: true),
                    ShopId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyRoutes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyRoutes_Runs_RunId",
                        column: x => x.RunId,
                        principalTable: "Runs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DailyRoutes_Shops_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Breaks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "time", nullable: false),
                    ShiftId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Breaks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Breaks_Shifts_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Runs",
                columns: new[] { "Id", "Number", "StartTime" },
                values: new object[,]
                {
                    { -2, 19, new TimeSpan(0, 10, 0, 0, 0) },
                    { -1, 68, new TimeSpan(0, 8, 0, 0, 0) }
                });

            migrationBuilder.InsertData(
                table: "Shops",
                columns: new[] { "Id", "City", "County", "Name", "Number", "PhoneNumber", "Postcode", "Street", "Street2" },
                values: new object[,]
                {
                    { -5, "Brandon", "Suffolk", "One Stop", 1223, 1842741000, "IP20JG", "2 Gander Avenue", "" },
                    { -4, "Thetford", "Suffolk", "Aldi", 121, 1842741000, "IP242JG", "34 Church Rise", "" },
                    { -3, "Stanwick", "Northants", "Tesco", 2004, 1536741000, "NN96JG", "10 Leighton Close", "" },
                    { -2, "Northampton", "Northants", "Tesco", 2005, 1604620000, "NN38px", "38 Chesham Rise", "" },
                    { -1, "Irthlingborough", "Northants", "Tesco", 2006, 1536741000, "NN95JG", "3 School Mews", "" }
                });

            migrationBuilder.InsertData(
                table: "DailyRoutes",
                columns: new[] { "Id", "DayOfWeek", "RunId", "ShopId", "WindowCloseTime", "WindowOpenTime" },
                values: new object[,]
                {
                    { -5, 1, -2, -5, new TimeSpan(0, 13, 15, 0, 0), new TimeSpan(0, 12, 15, 0, 0) },
                    { -4, 1, -2, -4, new TimeSpan(0, 11, 15, 0, 0), new TimeSpan(0, 10, 15, 0, 0) },
                    { -3, 1, -1, -3, new TimeSpan(0, 14, 30, 0, 0), new TimeSpan(0, 14, 15, 0, 0) },
                    { -2, 1, -1, -2, new TimeSpan(0, 13, 15, 0, 0), new TimeSpan(0, 12, 15, 0, 0) },
                    { -1, 1, -1, -1, new TimeSpan(0, 11, 15, 0, 0), new TimeSpan(0, 10, 15, 0, 0) }
                });

            migrationBuilder.InsertData(
                table: "Shifts",
                columns: new[] { "Id", "BreakDuration", "Date", "DriveTime", "EndTime", "OtherWorkTime", "RunId", "ShiftDuration", "StartTime", "WorkTime" },
                values: new object[,]
                {
                    { -2, new TimeSpan(0, 0, 30, 0, 0), new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0), new TimeSpan(0, 16, 0, 0, 0), new TimeSpan(0, 2, 0, 0, 0), -2, new TimeSpan(0, 6, 0, 0, 0), new TimeSpan(0, 10, 0, 0, 0), new TimeSpan(0, 1, 30, 0, 0) },
                    { -1, new TimeSpan(0, 1, 30, 0, 0), new DateTime(2023, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 55, 0, 0), new TimeSpan(0, 16, 0, 0, 0), new TimeSpan(0, 2, 5, 0, 0), -1, new TimeSpan(0, 8, 0, 0, 0), new TimeSpan(0, 8, 0, 0, 0), new TimeSpan(0, 1, 30, 0, 0) }
                });

            migrationBuilder.InsertData(
                table: "Breaks",
                columns: new[] { "Id", "Duration", "EndTime", "ShiftId", "StartTime" },
                values: new object[,]
                {
                    { -4, new TimeSpan(0, 0, 15, 0, 0), new TimeSpan(0, 14, 0, 0, 0), -2, new TimeSpan(0, 13, 45, 0, 0) },
                    { -3, new TimeSpan(0, 1, 0, 0, 0), new TimeSpan(0, 10, 0, 0, 0), -2, new TimeSpan(0, 9, 0, 0, 0) },
                    { -2, new TimeSpan(0, 1, 0, 0, 0), new TimeSpan(0, 14, 0, 0, 0), -1, new TimeSpan(0, 15, 0, 0, 0) },
                    { -1, new TimeSpan(0, 0, 30, 0, 0), new TimeSpan(0, 13, 0, 0, 0), -1, new TimeSpan(0, 12, 30, 0, 0) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Breaks_ShiftId",
                table: "Breaks",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyRoutes_RunId",
                table: "DailyRoutes",
                column: "RunId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyRoutes_ShopId",
                table: "DailyRoutes",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_Date",
                table: "Shifts",
                column: "Date",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_RunId",
                table: "Shifts",
                column: "RunId");

            migrationBuilder.CreateIndex(
                name: "IX_Shops_Name_Number",
                table: "Shops",
                columns: new[] { "Name", "Number" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Breaks");

            migrationBuilder.DropTable(
                name: "DailyRoutes");

            migrationBuilder.DropTable(
                name: "Shifts");

            migrationBuilder.DropTable(
                name: "Shops");

            migrationBuilder.DropTable(
                name: "Runs");

            migrationBuilder.DropSequence(
                name: "EntityFrameworkHiLoSequence");
        }
    }
}

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
                    WorkTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.Id);
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
                table: "Shifts",
                columns: new[] { "Id", "BreakDuration", "Date", "DriveTime", "EndTime", "OtherWorkTime", "ShiftDuration", "StartTime", "WorkTime" },
                values: new object[,]
                {
                    { -2, new TimeSpan(0, 0, 30, 0, 0), new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0), new TimeSpan(0, 16, 0, 0, 0), new TimeSpan(0, 2, 0, 0, 0), new TimeSpan(0, 6, 0, 0, 0), new TimeSpan(0, 10, 0, 0, 0), new TimeSpan(0, 1, 30, 0, 0) },
                    { -1, new TimeSpan(0, 1, 30, 0, 0), new DateTime(2023, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 55, 0, 0), new TimeSpan(0, 16, 0, 0, 0), new TimeSpan(0, 2, 5, 0, 0), new TimeSpan(0, 8, 0, 0, 0), new TimeSpan(0, 8, 0, 0, 0), new TimeSpan(0, 1, 30, 0, 0) }
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
                name: "IX_Shifts_Date",
                table: "Shifts",
                column: "Date",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Breaks");

            migrationBuilder.DropTable(
                name: "Shifts");

            migrationBuilder.DropSequence(
                name: "EntityFrameworkHiLoSequence");
        }
    }
}

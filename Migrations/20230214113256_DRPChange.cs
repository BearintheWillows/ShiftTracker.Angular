using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShiftTracker.Angular.Migrations
{
    /// <inheritdoc />
    public partial class DRPChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Runs");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Runs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "DailyRoutes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "DailyRoutes",
                keyColumn: "Id",
                keyValue: -5,
                column: "StartTime",
                value: new DateTime(1930, 1, 1, 3, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "DailyRoutes",
                keyColumn: "Id",
                keyValue: -4,
                column: "StartTime",
                value: new DateTime(1930, 1, 1, 3, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "DailyRoutes",
                keyColumn: "Id",
                keyValue: -3,
                column: "StartTime",
                value: new DateTime(1930, 1, 1, 3, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "DailyRoutes",
                keyColumn: "Id",
                keyValue: -2,
                column: "StartTime",
                value: new DateTime(1930, 1, 1, 3, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "DailyRoutes",
                keyColumn: "Id",
                keyValue: -1,
                column: "StartTime",
                value: new DateTime(1930, 1, 1, 3, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Runs",
                keyColumn: "Id",
                keyValue: -2,
                column: "Location",
                value: "Milton Keynes");

            migrationBuilder.UpdateData(
                table: "Runs",
                keyColumn: "Id",
                keyValue: -1,
                column: "Location",
                value: "Norwich");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Runs");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "DailyRoutes");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "Runs",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.UpdateData(
                table: "Runs",
                keyColumn: "Id",
                keyValue: -2,
                column: "StartTime",
                value: new TimeSpan(0, 10, 0, 0, 0));

            migrationBuilder.UpdateData(
                table: "Runs",
                keyColumn: "Id",
                keyValue: -1,
                column: "StartTime",
                value: new TimeSpan(0, 8, 0, 0, 0));
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShiftTracker.Angular.Migrations
{
    /// <inheritdoc />
    public partial class refactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shifts_Runs_RunId",
                table: "Shifts");

            migrationBuilder.DropIndex(
                name: "IX_Shifts_RunId",
                table: "Shifts");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "Run Variants",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateTable(
                name: "RunShift",
                columns: table => new
                {
                    RunId = table.Column<int>(type: "int", nullable: false),
                    ShiftsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RunShift", x => new { x.RunId, x.ShiftsId });
                    table.ForeignKey(
                        name: "FK_RunShift_Runs_RunId",
                        column: x => x.RunId,
                        principalTable: "Runs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RunShift_Shifts_ShiftsId",
                        column: x => x.ShiftsId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RunShift_ShiftsId",
                table: "RunShift",
                column: "ShiftsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RunShift");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "Run Variants",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_RunId",
                table: "Shifts",
                column: "RunId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shifts_Runs_RunId",
                table: "Shifts",
                column: "RunId",
                principalTable: "Runs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

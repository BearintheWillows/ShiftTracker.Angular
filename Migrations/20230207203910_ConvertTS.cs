using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShiftTracker.Angular.Migrations
{
    /// <inheritdoc />
    public partial class ConvertTS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shifts_Runs_RunId",
                table: "Shifts");

            migrationBuilder.AlterColumn<int>(
                name: "RunId",
                table: "Shifts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Shifts_Runs_RunId",
                table: "Shifts",
                column: "RunId",
                principalTable: "Runs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shifts_Runs_RunId",
                table: "Shifts");

            migrationBuilder.AlterColumn<int>(
                name: "RunId",
                table: "Shifts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Shifts_Runs_RunId",
                table: "Shifts",
                column: "RunId",
                principalTable: "Runs",
                principalColumn: "Id");
        }
    }
}

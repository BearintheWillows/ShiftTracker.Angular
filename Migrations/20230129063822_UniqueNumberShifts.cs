using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShiftTracker.Angular.Migrations
{
    /// <inheritdoc />
    public partial class UniqueNumberShifts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Runs_Number",
                table: "Runs",
                column: "Number",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Runs_Number",
                table: "Runs");
        }
    }
}

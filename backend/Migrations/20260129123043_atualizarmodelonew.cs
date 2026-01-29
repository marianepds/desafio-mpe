using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LocationApi.Migrations
{
    /// <inheritdoc />
    public partial class atualizarmodelonew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_locations",
                table: "locations");

            migrationBuilder.RenameTable(
                name: "locations",
                newName: "locs");

            migrationBuilder.RenameIndex(
                name: "IX_locations_name",
                table: "locs",
                newName: "IX_locs_name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_locs",
                table: "locs",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_locs",
                table: "locs");

            migrationBuilder.RenameTable(
                name: "locs",
                newName: "locations");

            migrationBuilder.RenameIndex(
                name: "IX_locs_name",
                table: "locations",
                newName: "IX_locations_name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_locations",
                table: "locations",
                column: "id");
        }
    }
}

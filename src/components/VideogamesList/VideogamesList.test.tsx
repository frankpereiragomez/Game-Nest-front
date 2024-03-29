import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getVideogamesDataMock } from "../../mocks/factories/videogames/videogamesFactory";
import { renderWithProviders, wrapWithRouter } from "../../utils/testUtils";
import VideogameList from "./VideogamesList";
import { realTokenMock } from "../../mocks/mockUser";
import { videogamesCollectionMock } from "../../mocks/videogamesMocks";

describe("Given a VideogamesList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the heading of every videogame", () => {
      const videogamesListMock = getVideogamesDataMock(3);

      renderWithProviders(wrapWithRouter(<VideogameList />), {
        videogames: { videogames: videogamesListMock },
      });

      videogamesListMock.forEach((videogame) => {
        const heading = screen.getByRole("heading", {
          name: videogame.name,
          level: 2,
        });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When it's rendered with a list of videogames and the user clicks the delete button of his own videogame", () => {
    test("Then it should show a list without the deleted videogame", async () => {
      const videogameListMock = videogamesCollectionMock;
      const buttonAltText = "remove button";

      renderWithProviders(wrapWithRouter(<VideogameList />), {
        user: {
          isLogged: true,
          id: videogameListMock[0].user as string,
          token: realTokenMock,
          name: videogameListMock[0].name,
        },
        videogames: { videogames: videogameListMock },
      });

      const heading = screen.getByRole("heading", {
        name: videogameListMock[0].name,
      });

      const button = screen.getAllByAltText(buttonAltText);

      await userEvent.click(button[0]);

      expect(heading).not.toBeInTheDocument();
    });
  });
});

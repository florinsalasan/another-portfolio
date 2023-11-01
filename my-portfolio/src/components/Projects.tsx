import React, { useState, useEffect } from "react";
// import ProjectCarousel from "./subComponents/ProjectCarousel";
import ProjectCard from "./subComponents/ProjectCard";
import SectionIntroduction from "./subComponents/SectionIntroduction";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import styles from "./Projects.module.css";
import { VoidExpression } from "typescript";

const fakeProjects = [
  {
    title: "Project 1",
    description: "This is the first project",
    imageSrc: "/cover.png",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 2",
    description: "This is the second project",
    imageSrc: "/cover.png",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 3",
    description: "This is the third project",
    imageSrc: "/cover.png",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  {
    title: "Project 4",
    description: "This is the fourth project",
    imageSrc: "/cover.png",
    link: "#",
    technologies: ["react", "nextjs"],
  },
  // Add more project data as needed
];

const Projects: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const totalCards = fakeProjects.length;

  useEffect(() => {
    const carousel = document.querySelector(`.${styles.carouselContainer}`); // Replace with your actual carousel class or selector

    if (carousel) {
      const handleCarouselClick = (event: Event) => {
        event.preventDefault();
        if (!event) return;
        const clickedElement = event.target as HTMLElement;
        if (!clickedElement) return;
        const clickedCard = clickedElement.closest(`.${styles.projectCard}`);
        if (!clickedCard) return;
        if (clickedCard.classList.contains(styles.left)) {
          // Handle left card click
          prevCard();
          // setCurrentCard(getPrevIndex(currentCard));
        } else if (clickedCard.classList.contains(styles.right)) {
          // Handle right card click
          nextCard();
          // setCurrentCard(getNextIndex(currentCard));
        } else {
          // Handle the active card click
          toggleModal();
        }
      };

      carousel.addEventListener("click", handleCarouselClick);

      return () => {
        carousel.removeEventListener("click", handleCarouselClick);
      };
    }
  }); // The empty dependency array ensures the effect runs only once on component mount this is what caused the listener to never update the array properly, removing it allowed for next and prevCard methods to cycle through the list as expected.

  const getPrevIndex = (currentIndex: number) =>
    (currentIndex - 1 + totalCards) % totalCards;
  const getNextIndex = (currentIndex: number) =>
    (currentIndex + 1) % totalCards;
  const getPrevReplaceIndex = (currentIndex: number) =>
    (currentIndex - 2 + totalCards) % totalCards;
  const getNextReplaceIndex = (currentIndex: number) =>
    (currentIndex + 2) % totalCards;

  const toggleModal = () => {
    // open modal or open a new page to go in greater details about the project
    console.log("modal will open grr");
    const activeCard = document.querySelector(`.${styles.active}`);
    if (!activeCard) return;
    const modal = activeCard.querySelector(`.modal`);
    if (!modal) return;
    modal.classList.toggle("hidden");
  };

  const nextCard = () => {
    console.log("next card was called");
    const cards = document.querySelectorAll(`.${styles.projectCard}`);
    const currentCardIndex = currentCard; // active card
    const prevCardIndex = getPrevIndex(currentCard); // left card
    const nextCardIndex = getNextIndex(currentCard); // right card
    const prevReplaceCardIndex = getPrevReplaceIndex(currentCard); // offLeft card
    const nextReplaceCardIndex = getNextReplaceIndex(currentCard); // offRight card

    if (
      (currentCardIndex || currentCardIndex === 0) && // active card
      (prevCardIndex || prevCardIndex === 0) && // left card
      (nextCardIndex || nextCardIndex === 0) && // right card
      (prevReplaceCardIndex || prevReplaceCardIndex === 0) && // offLeft card
      (nextReplaceCardIndex || nextReplaceCardIndex === 0) // offRight card @ 4 cards is equal to prevReplaceCardIndex
    ) {
      cards.forEach((card, index) => {
        // Add eventListeners for the end of animations on all 4 cards that could be affected
        card.addEventListener(
          "animationend",
          () => {
            if (index === currentCard) {
              card.classList.remove(styles.active, styles.moveLeftFromMiddle);
              // card.classList.add(styles.left);
            }
            if (index === prevCardIndex) {
              card.classList.remove(styles.left, styles.moveOffScreenFromLeft);
              // card.classList.add(styles.offLeft);
            }
            if (index === nextCardIndex) {
              card.classList.remove(styles.right, styles.moveMiddleFromRight);
              // card.classList.add(styles.active);
            }
            if (index === prevReplaceCardIndex) {
              card.classList.remove(styles.offLeft);
              // card.classList.add(styles.right);
            }
            if (index === nextReplaceCardIndex) {
              card.classList.remove(
                styles.offRight,
                styles.moveRightFromOffScreen
              );
              // card.classList.add(styles.right);
            }
          },
          { once: true }
        );
        // Add the classes that will animate the movement in the carousel
        if (index === currentCard) {
          card.classList.add(styles.moveLeftFromMiddle);
        }
        if (index === prevCardIndex) {
          card.classList.add(styles.moveOffScreenFromLeft);
          // card.classList.remove(styles.left);
        }
        if (index === nextCardIndex) {
          card.classList.add(styles.moveMiddleFromRight);
        }
        if (index === prevReplaceCardIndex) {
          card.classList.remove(styles.offLeft);
          // card.classList.add(styles.right);
        }
        if (index === nextReplaceCardIndex) {
          card.classList.add(styles.moveRightFromOffScreen);
          // card.classList.add(styles.right);
        }
      });
    }

    setTimeout(() => {
      setCurrentCard(getNextIndex(currentCard));
    }, 400);
  };

  const prevCard = () => {
    console.log("prev card was called");
    const cards = document.querySelectorAll(`.${styles.projectCard}`);
    const currentCardIndex = currentCard; // active card
    const prevCardIndex = getPrevIndex(currentCard); // left card
    const nextCardIndex = getNextIndex(currentCard); // right card
    const prevReplaceCardIndex = getPrevReplaceIndex(currentCard); // offLeft card
    const nextReplaceCardIndex = getNextReplaceIndex(currentCard); // offRight card

    if (
      (currentCardIndex || currentCardIndex === 0) && // active card
      (prevCardIndex || prevCardIndex === 0) && // left card
      (nextCardIndex || nextCardIndex === 0) && // right card
      (prevReplaceCardIndex || prevReplaceCardIndex === 0) && // offLeft card
      (nextReplaceCardIndex || nextReplaceCardIndex === 0) // offRight card @ 4 cards is equal to prevReplaceCardIndex
    ) {
      cards.forEach((card, index) => {
        // Add eventListeners for the end of animations on all 4 cards that could be affected
        card.addEventListener(
          "animationend",
          () => {
            if (index === currentCard) {
              card.classList.remove(styles.active, styles.moveRightFromMiddle);
              // card.classList.add(styles.left);
            }
            if (index === prevCardIndex) {
              card.classList.remove(styles.left, styles.moveMiddleFromLeft);
              // card.classList.add(styles.offLeft);
            }
            if (index === nextCardIndex) {
              card.classList.remove(
                styles.right,
                styles.moveOffScreenFromRight
              );
              // card.classList.add(styles.active);
            }
            if (index === prevReplaceCardIndex) {
              card.classList.remove(
                styles.offLeft,
                styles.moveLeftFromOffScreen
              );
              // card.classList.add(styles.right);
            }
            if (index === nextReplaceCardIndex) {
              card.classList.remove(styles.offRight);
              // card.classList.add(styles.right);
            }
          },
          { once: true }
        );
        // Add the classes that will animate the movement in the carousel
        if (index === currentCard) {
          card.classList.add(styles.moveRightFromMiddle);
        }
        if (index === prevCardIndex) {
          card.classList.add(styles.moveMiddleFromLeft);
          // card.classList.remove(styles.left);
        }
        if (index === nextCardIndex) {
          card.classList.add(styles.moveOffScreenFromRight);
        }
        if (index === prevReplaceCardIndex) {
          card.classList.add(styles.moveLeftFromOffScreen);
          // card.classList.add(styles.right);
        }
        if (index === nextReplaceCardIndex) {
          card.classList.remove(styles.offRight);
          // card.classList.add(styles.right);
        }
      });
    }

    setTimeout(() => {
      setCurrentCard(getPrevIndex(currentCard));
    }, 400);
  };

  // const goToCard = (index: number) => {
  //   // So in order to add animations to this as well I'd imagine the easiest way is to determine which direction is closer to navigate through and then just call nextCard or prevCard the amount of times necessary to cycle through to the selected card, now it's just a matter of determining the shorter route.

  //   const currentCardIndex = currentCard;
  //   const totalCards = fakeProjects.length;

  //   // Calculate the absolute differences between currentCard and the target index in both directions
  //   const differenceToNext =
  //     (index - currentCardIndex + totalCards) % totalCards;
  //   const differenceToPrev =
  //     (currentCardIndex - index + totalCards) % totalCards;

  //   if (differenceToNext <= differenceToPrev) {
  //     // Go to the next card
  //     for (let i = 0; i < differenceToNext; i++) {
  //       nextCard();
  //     }
  //   } else {
  //     // Go to the previous card
  //     for (let i = 0; i < differenceToPrev; i++) {
  //       prevCard();
  //     }
  //   }
  // };

  const goToCard = async (index: number) => {
    if (index === currentCard) {
      return; // No need to do anything if the target index is the same as the current one
    }

    const currentCardIndex = currentCard;
    const totalCards = fakeProjects.length;

    const differenceToNext =
      (index - currentCardIndex + totalCards) % totalCards;
    const differenceToPrev =
      (currentCardIndex - index + totalCards) % totalCards;

    const calls =
      differenceToNext <= differenceToPrev
        ? differenceToNext
        : differenceToPrev;

    for (let i = 0; i < calls; i++) {
      if (differenceToNext <= differenceToPrev) {
        nextCard();
        await new Promise((resolve) => {
          setTimeout(resolve, 450);
        });
      } else {
        prevCard();
        await new Promise((resolve) => {
          setTimeout(resolve, 450);
        });
      }
    }
  };

  // const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement>) => {
  //   event.preventDefault();
  // };

  return (
    <section id="projects" className={`pt-10 bg-blue-500 text-white`}>
      <div className="container mx-auto">
        <SectionIntroduction title="Projects" type="title" />

        <div className={`${styles.carouselContainer} p-6  `}>
          {fakeProjects.map((_, index) => (
            <input
              key={uuidv4()}
              type="radio"
              id={`radio-${index}`}
              name="slider"
              className={`${styles.radioButton}`}
              checked={index === currentCard}
              onChange={() => goToCard(index)}
            />
          ))}
          <div className={`${styles.cards}`}>
            {fakeProjects.map((project, index) => (
              <label
                key={uuidv4()}
                htmlFor={`radio-${index}`}
                // onClick={handleLabelClick}
              >
                <div
                  key={uuidv4()}
                  className={`${styles.projectCard} ${
                    index === currentCard ? `${styles.active}` : "" // Checks if it's the first card being mapped and sets it to active
                  } ${
                    index === getPrevIndex(currentCard) ? `${styles.left}` : "" // sets the card on the left of the active card, this is the prev card
                  }
                  ${
                    index === getPrevReplaceIndex(currentCard) // sets the card off screen to the left to come in when prev card is called
                      ? `${styles.offLeft}`
                      : ""
                  } ${
                    index === getNextIndex(currentCard) ? `${styles.right}` : "" // sets the card on the right of the active card, this is the next card
                  }${
                    index === getNextReplaceIndex(currentCard) // sets the card on off screen to the right to come in when next card is called
                      ? `${styles.offRight}`
                      : ""
                  }`}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    imageSrc={project.imageSrc}
                    link={project.link}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className={`${styles.carouselButtons}`}>
          <button className="prev" onClick={prevCard}>
            <span className={`p-6 ${styles.caret}`}>&#9664;</span>{" "}
            {/* Unicode for left-pointing caret */}
          </button>
          <div className={`${styles.navigationDots}`}>
            {fakeProjects.map((_, index) => (
              <span
                key={index}
                className={`${styles.navigationDot} ${
                  index === currentCard ? `${styles.active}` : ""
                }`}
                // onClick={() => goToCard(index)}
              ></span>
            ))}
          </div>
          <button className="next" onClick={nextCard}>
            <span className={`p-6 ${styles.caret}`}>&#9654;</span>{" "}
            {/* Unicode for right-pointing caret */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

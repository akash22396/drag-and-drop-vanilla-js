const containers = document.querySelectorAll(".container");
const draggables = document.querySelectorAll(".box");

draggables.forEach((drag, i) => {
  drag.addEventListener("dragstart", () => {
    // console.log("drag start");
    drag.classList.add("draging");
  });
  drag.addEventListener("dragend", () => {
    // console.log("drag end");
    drag.classList.remove("draging");
  });
});

containers.forEach((container, i) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    // console.log('drag over');
    const afterElement = getDrag(container, e.clientY);
    // console.log(afterElement);
    const draging = document.querySelector(".draging");
    if (afterElement == null) {
      container.appendChild(draging);
    } else {
      container.insertBefore(draging, afterElement);
    }
  });
});
let getDrag = (container, y) => {
  const dragElement = [...container.querySelectorAll(".box:not(.draging)")];
  return dragElement.reduce(
    (closet, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      // console.log(offset);
      if (offset < 0 && offset > closet.offset) {
        return { offset: offset, element: child };
      } else {
        return closet;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

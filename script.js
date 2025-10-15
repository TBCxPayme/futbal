document.addEventListener("DOMContentLoaded", () => {
  const field = document.getElementById("field");
  const formationSelect = document.getElementById("formation");

  const formations = {
    "4-3-3": [
      { name: "ЛВ", top: "18%", left: "20%" },
      { name: "ЦФ", top: "12%", left: "50%" },
      { name: "ПВ", top: "18%", left: "80%" },
      { name: "ЦПЛ", top: "40%", left: "35%" },
      { name: "ЦП", top: "45%", left: "50%" },
      { name: "ЦПП", top: "40%", left: "65%" },
      { name: "ЛЗ", top: "65%", left: "18%" },
      { name: "ЦЗЛ", top: "60%", left: "38%" },
      { name: "ЦЗП", top: "60%", left: "62%" },
      { name: "ПЗ", top: "65%", left: "82%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "4-4-2": [
      { name: "ЛН", top: "15%", left: "35%" },
      { name: "ПН", top: "15%", left: "65%" },
      { name: "ЛП", top: "35%", left: "25%" },
      { name: "ЦПЛ", top: "40%", left: "42%" },
      { name: "ЦПП", top: "40%", left: "58%" },
      { name: "ПП", top: "35%", left: "75%" },
      { name: "ЛЗ", top: "63%", left: "18%" },
      { name: "ЦЗЛ", top: "60%", left: "40%" },
      { name: "ЦЗП", top: "60%", left: "60%" },
      { name: "ПЗ", top: "63%", left: "82%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "4-2-3-1": [
      { name: "ЦФ", top: "12%", left: "50%" },
      { name: "ЛАП", top: "25%", left: "30%" },
      { name: "ЦАП", top: "25%", left: "50%" },
      { name: "ПАП", top: "25%", left: "70%" },
      { name: "ЦОПЛ", top: "45%", left: "42%" },
      { name: "ЦОПП", top: "45%", left: "58%" },
      { name: "ЛЗ", top: "63%", left: "18%" },
      { name: "ЦЗЛ", top: "60%", left: "40%" },
      { name: "ЦЗП", top: "60%", left: "60%" },
      { name: "ПЗ", top: "63%", left: "82%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "3-5-2": [
      { name: "ЛН", top: "18%", left: "40%" },
      { name: "ПН", top: "18%", left: "60%" },
      { name: "ЛП", top: "33%", left: "25%" },
      { name: "ЦПЛ", top: "38%", left: "38%" },
      { name: "ЦП", top: "40%", left: "50%" },
      { name: "ЦПП", top: "38%", left: "62%" },
      { name: "ПП", top: "33%", left: "75%" },
      { name: "ЛЦЗ", top: "60%", left: "35%" },
      { name: "ЦЗ", top: "60%", left: "50%" },
      { name: "ПЦЗ", top: "60%", left: "65%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "5-3-2": [
      { name: "ЛН", top: "18%", left: "40%" },
      { name: "ПН", top: "18%", left: "60%" },
      { name: "ЦПЛ", top: "40%", left: "38%" },
      { name: "ЦП", top: "43%", left: "50%" },
      { name: "ЦПП", top: "40%", left: "62%" },
      { name: "ЛЗ", top: "60%", left: "20%" },
      { name: "ЛЦЗ", top: "58%", left: "35%" },
      { name: "ЦЗ", top: "58%", left: "50%" },
      { name: "ПЦЗ", top: "58%", left: "65%" },
      { name: "ПЗ", top: "60%", left: "80%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "4-1-4-1": [
      { name: "ЦФ", top: "12%", left: "50%" },
      { name: "ЛП", top: "28%", left: "30%" },
      { name: "ЦПЛ", top: "32%", left: "42%" },
      { name: "ЦПП", top: "32%", left: "58%" },
      { name: "ПП", top: "28%", left: "70%" },
      { name: "ЦОП", top: "48%", left: "50%" },
      { name: "ЛЗ", top: "63%", left: "20%" },
      { name: "ЦЗЛ", top: "60%", left: "40%" },
      { name: "ЦЗП", top: "60%", left: "60%" },
      { name: "ПЗ", top: "63%", left: "80%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "3-4-3": [
      { name: "ЛВ", top: "18%", left: "25%" },
      { name: "ЦФ", top: "12%", left: "50%" },
      { name: "ПВ", top: "18%", left: "75%" },
      { name: "ЛП", top: "35%", left: "30%" },
      { name: "ЦПЛ", top: "40%", left: "45%" },
      { name: "ЦПП", top: "40%", left: "55%" },
      { name: "ПП", top: "35%", left: "70%" },
      { name: "ЛЦЗ", top: "60%", left: "38%" },
      { name: "ЦЗ", top: "60%", left: "50%" },
      { name: "ПЦЗ", top: "60%", left: "62%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "5-4-1": [
      { name: "ЦФ", top: "12%", left: "50%" },
      { name: "ЛП", top: "33%", left: "30%" },
      { name: "ЦПЛ", top: "38%", left: "45%" },
      { name: "ЦПП", top: "38%", left: "55%" },
      { name: "ПП", top: "33%", left: "70%" },
      { name: "ЛЗ", top: "60%", left: "20%" },
      { name: "ЛЦЗ", top: "58%", left: "35%" },
      { name: "ЦЗ", top: "58%", left: "50%" },
      { name: "ПЦЗ", top: "58%", left: "65%" },
      { name: "ПЗ", top: "60%", left: "80%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "4-5-1": [
      { name: "ЦФ", top: "12%", left: "50%" },
      { name: "ЛП", top: "30%", left: "25%" },
      { name: "ЦПЛ", top: "35%", left: "40%" },
      { name: "ЦП", top: "37%", left: "50%" },
      { name: "ЦПП", top: "35%", left: "60%" },
      { name: "ПП", top: "30%", left: "75%" },
      { name: "ЛЗ", top: "63%", left: "20%" },
      { name: "ЦЗЛ", top: "60%", left: "40%" },
      { name: "ЦЗП", top: "60%", left: "60%" },
      { name: "ПЗ", top: "63%", left: "80%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],

    "3-2-4-1": [
      { name: "ЦФ", top: "12%", left: "50%" },
      { name: "ЛАП", top: "25%", left: "35%" },
      { name: "ЦАПЛ", top: "25%", left: "45%" },
      { name: "ЦАПП", top: "25%", left: "55%" },
      { name: "ПАП", top: "25%", left: "65%" },
      { name: "ЦОПЛ", top: "45%", left: "45%" },
      { name: "ЦОПП", top: "45%", left: "55%" },
      { name: "ЛЦЗ", top: "60%", left: "38%" },
      { name: "ЦЗ", top: "60%", left: "50%" },
      { name: "ПЦЗ", top: "60%", left: "62%" },
      { name: "ВРТ", top: "85%", left: "50%" },
    ],
  };

  function renderFormation(name) {
    field.innerHTML = "";
    const formation = formations[name];
    formation.forEach((p) => {
      const div = document.createElement("div");
      div.className = "player";
      div.style.top = p.top;
      div.style.left = p.left;
      div.textContent = p.name;
      div.contentEditable = true;
      field.appendChild(div);
    });
  }

  formationSelect.addEventListener("change", (e) => {
    renderFormation(e.target.value);
  });

  renderFormation("4-3-3");
});

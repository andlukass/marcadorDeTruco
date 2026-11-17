import { useRef, type Dispatch, type SetStateAction } from "react";
import { BsDash, BsPencil } from "react-icons/bs";
import type { Team } from "../types";

interface CounterProps {
  team: Team;
  handValue: number;
  onScore: () => void;
  updateTeam: Dispatch<SetStateAction<Team>>;
}

export default function Counter({ team, updateTeam, handValue, onScore }: CounterProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const changePoints = (amount: number) => updateTeam(current => ({
    ...current, points: Math.max(0, Math.min(12, current.points + amount)),
  }));

  const awardHand = () => {
    changePoints(handValue);
    onScore();
  };
  const awardLabel = `Somar ${handValue} ${handValue === 1 ? "ponto" : "pontos"} para ${team.name}`;

  return (
    <section className="team" aria-label={team.name}>
      <button className="team-name" aria-label={`Editar nome de ${team.name}`} onClick={() => dialog.current?.showModal()}>
        <span>{team.name}</span><BsPencil />
      </button>
      <button className="score" disabled={team.points === 12} onClick={awardHand} aria-label={`${team.points} pontos. ${awardLabel}`}>
        {team.points}
      </button>
      <div className="controls">
        <button disabled={!team.points} aria-label={`Tirar ponto de ${team.name}`} onClick={() => changePoints(-1)}><BsDash aria-hidden="true" /></button>
        <button disabled={team.points === 12} aria-label={awardLabel} onClick={awardHand}>+{handValue}</button>
      </div>
      <dialog className="name-dialog" ref={dialog} aria-label="Editar equipe" onClose={event => event.currentTarget.querySelector("form")?.reset()}>
        <form method="dialog" onSubmit={event => {
          const name = String(new FormData(event.currentTarget).get("name")).trim();
          if (name) updateTeam(current => ({ ...current, name }));
        }}>
          <h2>Editar equipe</h2>
          <label>Nome da equipe<input key={team.name} name="name" defaultValue={team.name} autoFocus required /></label>
          <div className="dialog-actions">
            <button type="button" onClick={() => dialog.current?.close()}>Cancelar</button>
            <button>Salvar</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}

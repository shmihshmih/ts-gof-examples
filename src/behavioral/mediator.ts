/**
 * Посредник. Пользователи передают сообщения комнате.
 * Комната знает участников и решает, кому доставить сообщение.
 */
interface ChatMediator {
  send(from: Member, to: string, message: string): void;
}

class Member {
  constructor(readonly name: string, private readonly mediator: ChatMediator) {}

  send(to: string, message: string): void {
    this.mediator.send(this, to, message);
  }

  receive(from: string, message: string): void {
    console.log(`${this.name} получил от ${from}: ${message}`);
  }
}

class ChatRoom implements ChatMediator {
  private readonly members = new Map<string, Member>();

  join(name: string): Member {
    if (this.members.has(name)) {
      throw new Error(`Имя ${name} уже занято`);
    }
    const member = new Member(name, this);
    this.members.set(name, member);
    return member;
  }

  send(from: Member, to: string, message: string): void {
    const recipient = this.members.get(to);
    if (!recipient) {
      throw new Error(`В комнате нет участника с именем ${to}`);
    }
    recipient.receive(from.name, message);
  }
}

const room = new ChatRoom();
const ada = room.join("Ада");
room.join("Грейс");
ada.send("Грейс", "Привет!"); // Грейс получил от Ада: Привет!

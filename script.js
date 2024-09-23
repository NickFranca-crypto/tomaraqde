import java.util.Scanner;

public class JogoDaVelha3D {
    private char[][][] tabuleiro;
    private char jogadorAtual;

    public JogoDaVelha3D() {
        tabuleiro = new char[3][3][3];
        jogadorAtual = 'X';
        inicializarTabuleiro();
    }

    private void inicializarTabuleiro() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 3; k++) {
                    tabuleiro[i][j][k] = ' ';
                }
            }
        }
    }

    public void jogar() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            mostrarTabuleiro();
            System.out.printf("Jogador %c, insira sua jogada (plano linha coluna): ", jogadorAtual);
            int plano = scanner.nextInt();
            int linha = scanner.nextInt();
            int coluna = scanner.nextInt();

            if (plano < 0 || plano >= 3 || linha < 0 || linha >= 3 || coluna < 0 || coluna >= 3 || tabuleiro[plano][linha][coluna] != ' ') {
                System.out.println("Jogada inválida, tente novamente.");
                continue;
            }

            tabuleiro[plano][linha][coluna] = jogadorAtual;

            if (verificarVitoria(plano, linha, coluna)) {
                mostrarTabuleiro();
                System.out.printf("Jogador %c venceu!\n", jogadorAtual);
                break;
            }

            if (verificarEmpate()) {
                mostrarTabuleiro();
                System.out.println("Empate!");
                break;
            }

            jogadorAtual = (jogadorAtual == 'X') ? 'O' : 'X';
        }
        scanner.close();
    }

    private void mostrarTabuleiro() {
        for (int i = 0; i < 3; i++) {
            System.out.println("Plano " + i + ":");
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 3; k++) {
                    System.out.print(tabuleiro[i][j][k]);
                    if (k < 2) System.out.print("|");
                }
                System.out.println();
                if (j < 2) System.out.println("-----");
            }
            System.out.println();
        }
    }

    private boolean verificarVitoria(int plano, int linha, int coluna) {
        return verificarLinha(plano, linha) || verificarColuna(plano, coluna) || verificarDiagonal(plano) || verificarDiagonalSecundaria(plano) ||
               verificarProfundidade(linha, coluna);
    }

    private boolean verificarLinha(int plano, int linha) {
        return tabuleiro[plano][linha][0] == jogadorAtual && tabuleiro[plano][linha][1] == jogadorAtual && tabuleiro[plano][linha][2] == jogadorAtual;
    }

    private boolean verificarColuna(int plano, int coluna) {
        return tabuleiro[plano][0][coluna] == jogadorAtual && tabuleiro[plano][1][coluna] == jogadorAtual && tabuleiro[plano][2][coluna] == jogadorAtual;
    }

    private boolean verificarDiagonal(int plano) {
        return tabuleiro[plano][0][0] == jogadorAtual && tabuleiro[plano][1][1] == jogadorAtual && tabuleiro[plano][2][2] == jogadorAtual ||
               tabuleiro[plano][0][2] == jogadorAtual && tabuleiro[plano][1][1] == jogadorAtual && tabuleiro[plano][2][0] == jogadorAtual;
    }

    private boolean verificarDiagonalSecundaria(int plano) {
        return tabuleiro[0][0][0] == jogadorAtual && tabuleiro[1][1][1] == jogadorAtual && tabuleiro[2][2][2] == jogadorAtual ||
               tabuleiro[0][0][2] == jogadorAtual && tabuleiro[1][1][1] == jogadorAtual && tabuleiro[2][2][0] == jogadorAtual ||
               tabuleiro[0][2][0] == jogadorAtual && tabuleiro[1][1][1] == jogadorAtual && tabuleiro[2][0][2] == jogadorAtual ||
               tabuleiro[0][2][2] == jogadorAtual && tabuleiro[1][1][1] == jogadorAtual && tabuleiro[2][0][0] == jogadorAtual;
    }

    private boolean verificarProfundidade(int linha, int coluna) {
        return tabuleiro[0][linha][coluna] == jogadorAtual && tabuleiro[1][linha][coluna] == jogadorAtual && tabuleiro[2][linha][coluna] == jogadorAtual ||
               tabuleiro[0][linha][coluna] == jogadorAtual && tabuleiro[1][linha][coluna] == jogadorAtual && tabuleiro[2][linha][coluna] == jogadorAtual ||
               tabuleiro[0][linha][coluna] == jogadorAtual && tabuleiro[1][linha][coluna] == jogadorAtual && tabuleiro[2][linha][coluna] == jogadorAtual;
    }

    private boolean verificarEmpate() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 3; k++) {
                    if (tabuleiro[i][j][k] == ' ') {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public static void main(String[] args) {
        JogoDaVelha3D jogo = new JogoDaVelha3D();
        jogo.jogar();
    }
}

const tabuleiroElement = document.getElementById('tabuleiro');
const mensagemElement = document.getElementById('mensagem');
const reiniciarButton = document.getElementById('reiniciar');

let tabuleiro = Array(3).fill(null).map(() => Array(3).fill(null).map(() => Array(3).fill(null)));
let jogadorAtual = 'X';
let jogadas = 0;

function criarTabuleiro() {
    tabuleiroElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                const celula = document.createElement('div');
                celula.classList.add('celula');
                celula.setAttribute('data-plano', i);
                celula.setAttribute('data-linha', j);
                celula.setAttribute('data-coluna', k);
                celula.addEventListener('click', () => realizarJogada(i, j, k));
                tabuleiroElement.appendChild(celula);
            }
        }
    }
}

function realizarJogada(plano, linha, coluna) {
    if (tabuleiro[plano][linha][coluna] || verificarVitoria() || verificarEmpate()) {
        return;
    }

    tabuleiro[plano][linha][coluna] = jogadorAtual;
    jogadas++;
    atualizarTabuleiro();
    
    if (verificarVitoria()) {
        mensagemElement.textContent = `Jogador ${jogadorAtual} venceu!`;
    } else if (verificarEmpate()) {
        mensagemElement.textContent = 'Empate!';
    } else {
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    }
}

function atualizarTabuleiro() {
    const celulas = document.querySelectorAll('.celula');
    celulas.forEach(celula => {
        const plano = celula.getAttribute('data-plano');
        const linha = celula.getAttribute('data-linha');
        const coluna = celula.getAttribute('data-coluna');
        celula.textContent = tabuleiro[plano][linha][coluna] || '';
    });
}

function verificarVitoria() {
    // Checa linhas, colunas e diagonais para vitória
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (verificarLinha(i, j) || verificarColuna(i, j) || verificarDiagonal(i) || verificarProfundidade(j, i)) {
                return true;
            }
        }
    }
    return false;
}

function verificarLinha(plano, linha) {
    return tabuleiro[plano][linha][0] === jogadorAtual &&
           tabuleiro[plano][linha][1] === jogadorAtual &&
           tabuleiro[plano][linha][2] === jogadorAtual;
}

function verificarColuna(plano, coluna) {
    return tabuleiro[plano][0][coluna] === jogadorAtual &&
           tabuleiro[plano][1][coluna] === jogadorAtual &&
           tabuleiro[plano][2][coluna] === jogadorAtual;
}

function verificarDiagonal(plano) {
    return (tabuleiro[plano][0][0] === jogadorAtual && tabuleiro[plano][1][1] === jogadorAtual && tabuleiro[plano][2][2] === jogadorAtual) ||
           (tabuleiro[plano][0][2] === jogadorAtual && tabuleiro[plano][1][1] === jogadorAtual && tabuleiro[plano][2][0] === jogadorAtual);
}

function verificarProfundidade(linha, coluna) {
    return (tabuleiro[0][linha][coluna] === jogadorAtual && tabuleiro[1][linha][coluna] === jogadorAtual && tabuleiro[2][linha][coluna] === jogadorAtual);
}

function verificarEmpate() {
    return jogadas === 27; // 3x3x3 = 27 jogadas possíveis
}

reiniciarButton.addEventListener('click', () => {
    tabuleiro = Array(3).fill(null).map(() => Array(3).fill(null).map(() => Array(3).fill(null)));
    jogadorAtual = 'X';
    jogadas = 0;
    mensagemElement.textContent = '';
    criarTabuleiro();
});

criarTabuleiro();


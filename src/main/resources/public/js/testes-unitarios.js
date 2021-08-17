QUnit.test('Verifica se o valor realmente esta vazio quando em branco 1.', function (assert) {
  assert.equal(api.estaVazio(''), true);
});

QUnit.test('Verifica se o valor realmente esta vazio quando em branco 2.', function (assert) {
  assert.equal(api.estaVazio('a'), false);
});
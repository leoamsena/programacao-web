package com.leoam.agenda;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.Test;

import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import com.leoam.agenda.model.Contato;


public class EntityTest {
	@Test
    public void contatoValidTest() {
        Contato user = new Contato("nome tal","(37) 98404-7551","rua tal",35681097,219,"bairro","cidade", "MG");
        assertEquals("37984047551", user.getTelefone());
    }
	@Test(expected = NumberFormatException.class)
	public void contatoInvalidTest() {
		Contato user = new Contato("nome tal","(37) temletra98404-7551","rua tal",35681097,219,"bairro","cidade", "MG");
	}

}

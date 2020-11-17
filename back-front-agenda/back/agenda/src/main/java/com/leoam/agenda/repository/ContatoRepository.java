package com.leoam.agenda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leoam.agenda.model.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Integer>{
	List<Contato> findByNomeLike(String letra);
}


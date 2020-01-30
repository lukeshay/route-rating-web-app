package com.lukeshay.restapi.wall;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WallRepository extends JpaRepository<Wall, String> {

  List<Wall> findAllByGymId(String gymId);
}

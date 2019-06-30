
CREATE TABLE `geofence` (
  `id` int(11) NOT NULL,
  `zone` text NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL
) ;

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL,
  `message` varchar(100) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL
) ;

ALTER TABLE `geofence`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `geofence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;